import { Link as ReactRouterLink } from "react-router-dom";

export default function Link({
  to,
  text,
  highlight = false,
  small = false,
}: {
  to: string;
  text: string;
  highlight?: boolean;
  small?: boolean;
}) {
  const fontSize = small ? "text-[14px]" : "text-base";

  return (
    <ReactRouterLink
      className={`underline font-normal text-base ${fontSize} ${
        highlight ? "text-primary" : "text-[#808080]"
      }`}
      to={to}
    >
      {text}{" "}
    </ReactRouterLink>
  );
}
