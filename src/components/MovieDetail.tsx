import { useQuery } from "react-query";
import { IMovieDetail, getMovie, makeBgPath } from "../api";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;
const DetailBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 500px;
  height: 90vh;
  background-color: ${(props) => props.theme.black};
  color: ${(props) => props.theme.white};
  border-radius: 15px;
  overflow: hidden;

  img {
    width: 100%;
  }
  div {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
`;
const CloseBtn = styled.svg`
  width: 35px;
  top: 15px;
  right: 15px;
  position: absolute;
  cursor: pointer;
`;
const Info = styled.div``;
const Title = styled.span`
  font-size: 30px;
  font-weight: 600;
  padding-bottom: 10px;
`;
const Overview = styled.span`
  font-size: 16px;
  padding-bottom: 20px;
`;

function MovieDetail() {
  const { id } = useParams();
  const { data: movieDetailList } = useQuery<IMovieDetail>(["detail", id], () =>
    getMovie(id + "")
  );

  const navigate = useNavigate();
  const onClosedClicked = () => navigate(-1);

  const PopularMatch = useMatch("movie/:id");
  const NowMatch = useMatch("now/movie/:id");
  const SoonMatch = useMatch("soon/movie/:id");

  return (
    <div>
      {PopularMatch || SoonMatch || NowMatch ? (
        <>
          <Overlay onClick={onClosedClicked} />
          <DetailBox layoutId={id}>
            <img src={makeBgPath(movieDetailList?.backdrop_path + "")} />
            <CloseBtn
              onClick={onClosedClicked}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              ></path>
            </CloseBtn>
            <Info>
              <Title>{movieDetailList?.title}</Title>
              <Overview>{movieDetailList?.overview}</Overview>
              <span>Budget: ${movieDetailList?.budget}</span>
              <span>Revenue: ${movieDetailList?.revenue}</span>
              <span>Runtime: {movieDetailList?.runtime} minutes</span>
            </Info>
          </DetailBox>
        </>
      ) : null}
    </div>
  );
}
export default MovieDetail;
