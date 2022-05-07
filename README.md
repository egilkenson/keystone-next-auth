# NextJS SSR with Authenticated KeystoneJS Backend
This is an example of using KeystoneJS to provide authentication and session management for a NextJS app with SSR and client-side data fetching.

The NextJS API routes take in the sessionToken from incoming requests and pass it on to the KeystoneJS GraphQL server using the `authorization: Bearer TOKEN` pattern.

Data fetching for each API route is broken out into separate functions and exported so that they may be used by `getServerSideProps` and `getStaticProps`, as well.

This opens the KeystoneJS Access Control API for use with NextJS SSR. The client only needs to connect to the NextJS server and never directly to KeystoneJS.
