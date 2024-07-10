import { Link as RLink, LinkProps as RLinkProps } from "react-router-dom";
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";

export default function Link(props: MuiLinkProps & RLinkProps) {
    return <MuiLink color="secondary" component={RLink} {...props} />;
}
