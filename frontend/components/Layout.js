/* /components/Layout.js */

import React from "react";
import Head from "next/head";
import Link from "next/link";
import { unsetToken } from "../lib/auth";
import { Container, Nav, NavItem } from "reactstrap";
import defaultPage from "../hocs/defaultPage";
import Cookie from "js-cookie";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const colors = (darkMode) => (
  <style jsx>
    {`
      :root {
        --primary: ${darkMode ? "#f5f5f5" : "#343a40"};
        --reversePrimary: ${darkMode ? "#343a40" : "#f5f5f5"};
        --secondary: #007bff;
        --mainText: ${darkMode ? "white" : "black"};
        --secondaryText: ${darkMode ? "black" : "white"};
      }

      body {
        background-color: var(--reversePrimary);
      }
      .navbar {
        background-color: var(--primary);
      }
      .navbar a {
        color: var(--secondaryText) !important;
      }

      .restaurant-name {
        color: var(--mainText) !important;
      }
    `}
  </style>
);

class Layout extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      config: {},
    };
  }

  componentDidMount() {
    this.loadThemeData();
  }

  async loadThemeData() {
    const res = await fetch("http://localhost:1337/configurations");
    const config = await res.json();

    this.setState({
      config,
    });
  }

  static async getInitialProps({ req }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, isAuthenticated };
  }

  render() {
    const { isAuthenticated, children } = this.props;
    const title = "Welcome to Nextjs";
    console.log();
    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
          <script src="https://js.stripe.com/v3" />
        </Head>
        {colors(this.state.config.darkMode)}
        <header>
          <Nav className="navbar navbar-dark">
            <NavItem>
              <Link href="/">
                <a className="navbar-brand">Home</a>
              </Link>
            </NavItem>
            {isAuthenticated ? (
              <>
                <NavItem className="ml-auto">
                  <span style={{ color: "white", marginRight: 30 }}>
                    {this.props.loggedUser}
                  </span>
                </NavItem>
                <NavItem>
                  <Link href="/">
                    <a className="logout" onClick={unsetToken}>
                      Logout
                    </a>
                  </Link>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem className="ml-auto">
                  <Link href="/signin">
                    <a className="nav-link">Sign In</a>
                  </Link>
                </NavItem>

                <NavItem>
                  <Link href="/signup">
                    <a className="nav-link"> Sign Up</a>
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>
        </header>
        <Container>{children}</Container>
        <footer className="footer">
          {"Strapi footer"}
          <style jsx>
            {`
              .footer {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 60px;
                line-height: 60px;
                background-color: var(--primary);
                color: var(--secondaryText);
              }
              a:hover {
                cursor: pointer;
                color: yellow;
              }
            `}
          </style>
        </footer>
      </div>
    );
  }
}

export default defaultPage(Layout);
