import { useQuery } from "react-query";
import { IAPIResponse, getNowPlaying, getPopular, makeImagePath } from "../api";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";

//styled-components
const Loading = styled.div`
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled(motion.ul)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`;
const Box = styled(motion.li)`
  height: 300px;
  text-align: center;
  span {
    color: ${(props) => props.theme.white};
    font-weight: 600;
  }
`;
const Img = styled(motion.img)`
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
`;

// variants
const WrapperVariants = {
  start: {},
  end: {
    transition: {
      type: "spring",
      bounce: 0.5,
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const BoxVariants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};
const ImgVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    y: -15,
  },
};

function NowPlaying() {
  const { data: movieList, isLoading: movieLoading } = useQuery<IAPIResponse>(
    ["movieList", "now"],
    getNowPlaying
  );

  const navigate = useNavigate();
  const onBoxClicked = (id: number) => {
    navigate(`movie/${id}`);
  };

  return (
    <>
      {movieLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <Wrapper variants={WrapperVariants} initial="start" animate="end">
          {movieList?.results.map((movie) => (
            <Box key={movie.id} layoutId={movie.id + ""} variants={BoxVariants}>
              <Img
                src={makeImagePath(movie.poster_path)}
                alt={movie.title}
                variants={ImgVariants}
                initial="normal"
                whileHover="hover"
                transition={{ type: "tween" }}
                onClick={() => onBoxClicked(movie.id)}
              />
              <span>{movie.title}</span>
            </Box>
          ))}
        </Wrapper>
      )}
      <MovieDetail />
    </>
  );
}

export default NowPlaying;
