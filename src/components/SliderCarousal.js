/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Container = styled.div`
  h3 {
    font-size: 24px;
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

const reviews = [
  {
    id: 1,
    title: 'Good job by team',
    name: 'Danny',
    country: 'Sevenoaks',
    date: '12 Dec 2020',
    comment:
      ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  },
  {
    id: 2,
    title: 'Good job by team',
    name: 'Jenny',
    country: 'Sevenoaks',
    date: '15 Nov 2020',
    comment:
      ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  },
  {
    id: 3,
    title: 'Good job by team',
    name: 'Linda',
    country: 'Spain',
    date: '12 Oct 2020',
    comment:
      ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  },
  {
    id: 4,
    title: 'Good job by team',
    name: 'Mac',
    country: 'Italy',
    date: '01 Oct 2020',
    comment:
      ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  },
];

export default class PreviousNextMethods extends Component {
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
    return (
      <Container>
        <Slider ref={(c) => (this.slider = c)} {...settings}>
          {reviews &&
            reviews.map((review) => (
              <div key={review.id}>
                <h3>{review.title}</h3>
                <p className="date">{review.date}</p>
                <p className="user-comment">&quot;{review.comment}&rdquo;</p>
                <p className="user-name">
                  {review.name}, {review.country}
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
