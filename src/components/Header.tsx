import styled from "styled-components";
import { Link, useMatch } from "react-router-dom";
import { motion } from "framer-motion";

// styled-components
const Nav = styled.ul`
  display: flex;
  justify-content: center;
  gap: 50px;
  padding-bottom: 70px;
`;
const Menu = styled.li`
  position: relative;
`;
const Circle = styled(motion.span)`
  background-color: ${(props) => props.theme.red};
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  bottom: -10px;
  right: 0;
  left: 0;
  margin: 0 auto;
`;

function Header() {
  const popularMatch = useMatch("/");
  const nowMatch = useMatch("now");
  const soonMatch = useMatch("soon");

  return (
    <Nav>
      <Menu>
        <Link to="">
          POPULAR
          {popularMatch && <Circle layoutId="circle" />}
        </Link>
      </Menu>
      <Menu>
        <Link to="now">
          NOW PLAYING
          {nowMatch && <Circle layoutId="circle" />}
        </Link>
      </Menu>
      <Menu>
        <Link to="soon">
          COMING SOON
          {soonMatch && <Circle layoutId="circle" />}
        </Link>
      </Menu>
    </Nav>
  );
}

export default Header;
