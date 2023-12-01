import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(`/api/products/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      <h3>Reviews:</h3>
      {data.reviews.map((review) => (
        <ul key={review._id}>
          <li>Title: {review.title}</li>
          <li>Comment: {review.text}</li>
        </ul>
      ))}
      <StyledLink href="/">Back to all</StyledLink>
    </ProductCard>
  );
 }
