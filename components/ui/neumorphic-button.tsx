"use client";

import React from "react";
import styled from "styled-components";

interface NeumorphicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
}

const StyledWrapper = styled.div`
  display: inline-block;

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: #ffffff;
    padding: 1em 1.8em;
    border-radius: 10px;
    box-shadow:
      6px 6px 10px -1px rgba(0, 0, 0, 0.15),
      -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: transform 0.5s, box-shadow 0.5s, border 0.5s;
    font-size: 1rem;
    font-weight: 600;
    color: #032CC8;
    text-decoration: none;
    font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  .btn:hover {
    box-shadow:
      inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2),
      inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),
      -0.5px -0.5px 0px rgba(255, 255, 255, 1),
      0.5px 0.5px 0px rgba(0, 0, 0, 0.15),
      0px 12px 10px -10px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.1);
    transform: translateY(0.5em);
  }

  .btn svg {
    transition: transform 0.5s, fill 0.5s;
  }

  .btn:hover svg {
    transform: scale(0.9);
    fill: #333333;
  }
`;

/**
 * Neumorphic Button - Soft UI style with inset hover effect
 * From Uiverse.io by talhabangyal
 */
export function NeumorphicButton({
  children,
  onClick,
  href,
  ariaLabel,
  type = "button",
}: NeumorphicButtonProps) {
  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    const isAnchor = href.startsWith("#");

    if (isAnchor) {
      return (
        <StyledWrapper>
          <button
            className="btn"
            onClick={() => {
              const element = document.getElementById(href.slice(1));
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
              onClick?.();
            }}
            aria-label={ariaLabel}
            type="button"
          >
            {children}
          </button>
        </StyledWrapper>
      );
    }

    return (
      <StyledWrapper>
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="btn"
          aria-label={ariaLabel}
        >
          {children}
        </a>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <button
        onClick={onClick}
        className="btn"
        aria-label={ariaLabel}
        type={type}
      >
        {children}
      </button>
    </StyledWrapper>
  );
}

export default NeumorphicButton;
