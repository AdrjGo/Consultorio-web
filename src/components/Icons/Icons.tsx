import Logo from "/logo.svg";

type IconProps = React.ImgHTMLAttributes<HTMLImageElement>;

function IconWrapper({
  src,
  className,
  ...props
}: IconProps & { src: string }) {
  return <img src={src} className={className} {...props} alt="" />;
}

export const Icons = {
  Logo: (props: IconProps) => <IconWrapper src={Logo} {...props} />,
  LogoUser: (props: IconProps) => <img src={import.meta.env.VITE_LOGO_SYS_URL} {...props} />,
};

