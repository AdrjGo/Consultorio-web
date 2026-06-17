import { supabase } from "@store";
import Logo from "/logo.svg";

type IconProps = React.ImgHTMLAttributes<HTMLImageElement>;

function IconWrapper({
  src,
  className,
  ...props
}: IconProps & { src: string }) {

  return <img src={src} className={className} {...props} alt="" />;
}
const userLogo = () => {
  const { data: publicUrl } = supabase.storage
    .from("logo")
    .getPublicUrl('logo_consultorio');
  return publicUrl
}

export const Icons = {
  Logo: (props: IconProps) => <IconWrapper src={Logo} {...props} />,
  LogoUser: (props: IconProps) => <img src={userLogo().publicUrl} {...props} />,
};

