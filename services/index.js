import { gql, GraphQLClient } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const hygraph = new GraphQLClient(
  graphqlAPI,
);

export const addToShoppingCart = async ( slug ) => {
  const query = gql`
    mutation AddToCart($slug: String!) {
      updateProduct(where: {slug: $slug}, data: {isInTheShoppingCart: true}) {
        isInTheShoppingCart
    }
}

  `;

  const isInTheShoppingCart = await hygraph.request(query, { slug })
  return isInTheShoppingCart;
}

export const removeFromShoppingCart = async ( slug ) => {
  const query = gql`
    mutation removeFromCart($slug: String!) {
      updateProduct(where: {slug: $slug}, data: {isInTheShoppingCart: false}) {
        isInTheShoppingCart
    }
}

  `;

  const isInTheShoppingCart = await hygraph.request(query, { slug })
  return isInTheShoppingCart;
}

export async function GetCategories() {
  const QUERY = gql`
      query MyQuery {
        categories {
          id
          slug
          categoryTitle
          products {
            slug
            title
            id
            price
            productDescription
            productImage {
              url
            }
            featuresImage {
              url
            }
          }
        }
      }

  `

    const { categories } = await hygraph.request(QUERY)
    return categories
}

export async function getProducts() {
  const QUERY = gql`
    query MyQuery {
      products {
        id
        price
        productDescription
        productImage {
          url
        }
        title
        slug
        details
        featuresImage {
          url
        }
        isInTheShoppingCart
      }
    }
  `
  

    const { products } = await hygraph.request(QUERY)
    return products
}

export const GetProductDetails = async (slug) => {
  const query = gql`
    query GetProductDetails {
      product(where: {slug: { $slug }}) {
        title
        productImage {
          url
        }
        slug
        productDescription
        details
        price
        featuresImage {
          url
        }
      }
    }
  `;
    

const result = await request(graphqlAPI, query, {slug});

return result.post;
};
