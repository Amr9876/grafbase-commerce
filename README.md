# grafbase-commerce

A full-stack web app that showcases the power and simplicity of Grafbase, a graph database as a service platform. The app allows users to browse, search and buy products from different categories, as well as manage their orders, cart and profile. The app also features a dashboard for admins to manage products, users and orders.

## Technologies

- Grafbase: A cloud-based graph database that lets you store and query your data using GraphQL. Grafbase handles the authentication, authorization, scalability and performance of your database, so you can focus on your business logic. Grafbase also provides a web console to explore your data and run queries interactively.
- Next.js 13.4: A React framework that enables hybrid static and server rendering, TypeScript support, fast refresh, image optimization and more. Next.js makes it easy to build fast and user-friendly web apps with minimal configuration.
- TypeScript: A superset of JavaScript that adds static types and other features to enhance the developer experience and catch errors early.
- Tailwind CSS: A utility-first CSS framework that provides a set of predefined classes to style your elements. Tailwind CSS allows you to create custom designs without writing any CSS code.

## Features

- Responsive design that adapts to different screen sizes and devices
- Product listing
- Product details with image, gallery and description
- Shopping cart with local storage persistence and checkout functionality
- User profile with order history
- Error handling and validation for user inputs and API requests
- Loading indicators for better user feedback
- SEO-friendly meta tags and titles for each page

## Installation

To run this project locally, you need to have Node.js (v14 or higher) and npm (v7 or higher) installed on your machine.

1. Clone this repository:

```bash
git clone https://github.com/Amr9876/grafbase-commerce.git
```

2. Install the dependencies:

```bash
cd grafbase-commerce
npm install
```

3. Create a Grafbase account and a new database at https://grafbase.io. Copy the database URL and the API key from the web console.

4. Create a `.env.local` file in the root folder of the project and add the following environment variables:

```bash
STRIPE_SECRET_KEY=your_stripe_secret_key
BASE_URL=your_client_side_base_url
```

5. Optionally, you can also add environment variables for social login providers (Google, Facebook, etc.) by following the instructions at https://next-auth.js.org/providers.

6. Run the development server:

```bash
cd backend && npx grafbase dev
cd frontend && npm run dev 
```

7. Open http://localhost:3000 in your browser to see the app, and http://localhost:4000 to see Grafbase backend UI.

## Deployment

To deploy this project to a production environment, you can use any hosting service that supports Next.js, such as Vercel, Netlify or Heroku. You will need to add the same environment variables as in step 4 to your hosting platform.

For more details on how to deploy Next.js apps, check out the official documentation at https://nextjs.org/docs/deployment.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
