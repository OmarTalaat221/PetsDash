const Typo = ({
  color,
  variant,
  icon,
  fit,
  width,
  onClick,
  bg,
  nowrap,
  positon,
  style,
  transform,
  fw,
  cursor,
  br,
  m,
  mt,
  mb,
  ml,
  mr,
  my,
  mx,
  p,
  pt,
  pb,
  pl,
  pr,
  py,
  px,
  opacity,
  ls,
  className,
  children,
}) => {
  const variants = {
    xxs: "0.625rem", // Extra Extra Small (10px)
    xs: "0.75rem", // Extra Small (12px)
    sm: "0.875rem", // Small (14px)
    md: "1rem", // Medium (16px) - often the base font size
    lg: "1.125rem", // Large (18px)
    xl: "1.25rem", // Extra Large (20px)
    xxl: "1.5rem", // Extra Extra Large (24px)
    h1: "2.5rem", // Extra Large Heading (40px)
    h2: "2rem", // Large Heading (32px)
    h3: "1.75rem", // Medium-Large Heading (28px)
    h4: "1.5rem", // Medium Heading (24px)
    h5: "1.25rem", // Small-Medium Heading (20px)
    h6: "1rem", // Small Heading (16px)
    h7: "0.875rem", // Extra Small Heading (14px)
    h8: "0.75rem", // Extra Extra Small Heading (12px)
  };

  const positons = {
    end: "end",
    center: "center",
    start: "start",
  };

  const colors = {
    primary: "#0d6efd", // Blue
    secondary: "#6c757d", // Gray
    success: "#198754", // Green
    danger: "#dc3545", // Red
    warning: "#ffc107", // Yellow
    info: "#0dcaf0", // Cyan
    light: "#f8f9fa", // Light Gray
    dark: "#212529", // Dark Gray
    dark1: "#47515c", // Dark Gray
    blue: "#0d6efd",
    indigo: "#6610f2",
    purple: "#6f42c1",
    gray1: "#6e6e6e",
    pink: "#d63384",
    red: "#dc3545",
    orange: "#fd7e14",
    yellow: "#ffc107",
    green: "#198754",
    teal: "#20c997",
    cyan: "#0dcaf0",
    white: "#ffffff",
    black: "#000000",
  };

  const classNames = "typography " + className || "";

  const fontWeights = {
    bold: 700,
    bolder: "bolder",
    semibold: 600,
    medium: 500,
    normal: 400,
    light: 300,
    lighter: "lighter",
  };

  const paddings = {
    p: "padding",
    pt: "paddingTop",
    pb: "paddingBottom",
    pl: "paddingLeft",
    pr: "paddingRight",
    py: "paddingBlock",
    px: "paddingInline",
  };

  const margins = {
    m: "margin",
    mt: "marginTop",
    mb: "marginBottom",
    ml: "marginLeft",
    mr: "marginRight",
    my: "marginBlock",
    mx: "marginInline",
  };

  return (
    <div
      className={className}
      onClick={onClick ? onClick : null}
      style={{
        width: width?  width :  fit ? "fit-content" : "auto",
        backgroundColor: bg ? (colors[bg] ? colors[bg] : bg) : "transparent",
        color: color ? (colors[color] ? colors[color] : color) : "#222",
        fontSize: variant ? variants[variant] : "16px",
        textAlign: positon ? positons[positon] : "start",
        fontWeight: fw ? fontWeights[fw] : "normal",
        textTransform:transform ? transform:"",
        cursor: cursor ? cursor : "auto",
        whiteSpace: nowrap ? "nowrap" : "normal",
        letterSpacing: ls ? `${ls}` : "",
        borderRadius: br ? br : "",
        [paddings["pt"]]: pt ? pt : "",
        [paddings["pb"]]: pb ? pb : "",
        [paddings["pr"]]: pr ? pr : "",
        [paddings["pl"]]: pl ? pl : "",
        [paddings["py"]]: py ? py : "",
        [paddings["px"]]: px ? px : "",
        padding: p ? p : "",
        [margins["m"]]: m ? m : "",
        [margins["mt"]]: mt ? mt : "",
        [margins["mb"]]: mb ? mb : "",
        [margins["mr"]]: mr ? mr : "",
        [margins["ml"]]: ml ? ml : "",
        [margins["my"]]: my ? my : "",
        [margins["mx"]]: mx ? mx : "",

        opacity: opacity ? opacity : "",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Typo;
