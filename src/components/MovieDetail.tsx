import { useQuery } from "react-query";
import { IMovieDetail, getMovie, makeImagePath } from "../api";
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
  width: 80vw;
  height: 80vh;
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
  const onOverlayClicked = () => navigate("/");

  const movieDetailMatch = useMatch("/:id");

  return (
    <div>
      {movieDetailMatch ? (
        <>
          <Overlay onClick={onOverlayClicked} />
          <DetailBox>
            <img src={makeImagePath(movieDetailList?.backdrop_path + "")} />
            <div>
              <Title>{movieDetailList?.title}</Title>
              <Overview>{movieDetailList?.overview}</Overview>
              <span>Budget: ${movieDetailList?.budget}</span>
              <span>Revenue: ${movieDetailList?.revenue}</span>
              <span>Runtime: {movieDetailList?.runtime} minutes</span>
            </div>
          </DetailBox>
        </>
      ) : null}
    </div>
  );
}
export default MovieDetail;
