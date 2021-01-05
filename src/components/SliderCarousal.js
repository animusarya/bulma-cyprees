/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import moment from 'moment';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Container = styled.div`
  justify-content: center;
  h3 {
    font-weight: bold;
    text-align: center;
  }
  .date {
    font-size: 14px;
    text-align: center;
  }
  .user-comment {
    font-size: 18px;
    padding: 30px;
    text-align: center;
  }
  .user-name {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 30px;
  }
  button {
    background-color: #000000;
    border-radius: 20px;
    :last-child {
      margin-left: 10px;
    }
  }
  span {
    font-weight: bolder;
    color: #ffffff;
    font-size: 20px;
    margin-top: -5px;
  }
  .slick-track,
  .slick-slider {
    :focus {
      outline: none;
    }
  }
`;

export default class SliderCarousals extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const { project, reviews } = this.props;

    return (
      <Container>
        <Slider ref={(c) => (this.slider = c)} {...settings}>
          {reviews &&
            reviews.map((review) => (
              <div key={review.id}>
                <h3
                  style={{
                    color: `${project.reviewTitleColor}`,
                    fontSize: `${project.reviewTitleSize}px`,
                  }}>
                  {review.reviewTitle}
                </h3>
                <p className="date">
                  {moment(review.createdAt).format('Do MMM YY')}
                </p>
                <p
                  className="user-comment"
                  style={{
                    color: `${project.reviewBodyColor}`,
                    fontSize: `${project.reviewBodySize}px`,
                  }}>
                  &quot;{review.comment}&rdquo;
                </p>
                <p
                  className="user-name"
                  style={{
                    color: `${project.reviewAuthorColor}`,
                    fontSize: `${project.reviewAuthorSize}px`,
                  }}>
                  {review.personName}, {review.location}
                </p>
              </div>
            ))}
        </Slider>
        <div style={{ textAlign: 'center' }}>
          <button className="button" type="button" onClick={this.previous}>
            <span>&lt;</span>
          </button>
          <button className="button" type="button" onClick={this.next}>
            <span>&gt;</span>
          </button>
        </div>
      </Container>
    );
  }
}
