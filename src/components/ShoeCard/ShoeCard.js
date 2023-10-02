import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {
            //I promise I would not have this very nasty nested component in an actual
            //project :(
            //Just wanted to finish fast
          }
          {variant !== 'default' ? (
            <Tag variant={variant}>
              {variant === 'new-release' ? (
                <span>Just released!</span>
              ) : variant === 'on-sale' ? (
                <span>Sale</span>
              ) : null}
            </Tag>
          ) : null}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price salePrice={salePrice}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          ) : null}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
  max-width: 500px;
`;

const Image = styled.img`
  width: 100%;
  min-width: 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${(props) => (props.salePrice ? 'line-through' : null)};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const Tag = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${(props) =>
    props.variant === 'new-release' ? '#6868D9' : '#C5295D'};
  color: white;
  padding: 8px 16px;
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
