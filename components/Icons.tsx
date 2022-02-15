import {
  HiAcademicCap,
  HiHome,
  HiMenu,
  HiOutlineAcademicCap,
  HiOutlineHome,
  HiOutlineTemplate,
  HiTemplate,
} from 'react-icons/hi';

export const HomeIcon = ({ outline }: { outline: boolean }) => {
  if (outline) return <HiOutlineHome />;
  return <HiHome />;
};

export const ProjectsIcon = ({ outline }: { outline: boolean }) => {
  if (outline) return <HiOutlineTemplate />;
  return <HiTemplate />;
};
export const AboutIcon = ({ outline }: { outline: boolean }) => {
  if (outline) return <HiOutlineAcademicCap />;
  return <HiAcademicCap />;
};
export const MenuIcon = () => {
  return <HiMenu />;
};
