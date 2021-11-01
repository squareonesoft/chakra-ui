import { ThemingProps, HTMLChakraProps } from "@chakra-ui/system";
export interface SkipNavLinkProps extends HTMLChakraProps<"a">, ThemingProps<"SkipNavLink"> {
}
/**
 * Renders a link that remains hidden until focused to skip to the main content.
 */
export declare const SkipNavLink: import("@chakra-ui/system").ComponentWithAs<"a", SkipNavLinkProps>;
export interface SkipNavContentProps extends HTMLChakraProps<"div"> {
}
/**
 * Renders a div as the target for the link.
 */
export declare const SkipNavContent: import("@chakra-ui/system").ComponentWithAs<"div", SkipNavContentProps>;
//# sourceMappingURL=index.d.ts.map