import { createGlobalStyle } from "styled-components"
import { rhythm } from "../utils/typography"

const GlobalStyle = createGlobalStyle`

  a {
    //color: #1daa2c
    //color: #ebd45b // Yellow (from header)
    //color: #75a071 //Green (from header)
    color: #0e4a76 // Blue (from header)
  }

  th:first-child, td:first-child {
    padding-left: 13px;
  }

  th:last-child, td:last-child {
    padding-right: 13px;
  }

  table {
  padding: 0; }
  table tr {
    border-top: 1px solid #cccccc;
    background-color: white;
    margin: 0;
    padding: 0; }
    table tr:nth-child(2n) {
      background-color: #f8f8f8; }
    table tr th {
      font-weight: bold;
      border: 1px solid #cccccc;
      text-align: left;
      margin: 0;
      padding: 6px 13px; }
    table tr td {
      border: 1px solid #cccccc;
      text-align: left;
      margin: 0;
      padding: 6px 13px; }
    table tr th :first-child, table tr td :first-child {
      margin-top: 0; }
    table tr th :last-child, table tr td :last-child {
      margin-bottom: 0; }

    // Lighterpack style
    h2.lpListName {
      display: none;
    }

    h2.lpItems {
      padding-top: 10em;
    }

    h2.lpCategoryName {
      margin: 0 0 0;
    }

    .lp li {
      margin-bottom: 0px;
    }

    .lp a {
      box-shadow: none;
    }

    .lp h2 {
      margin-bottom: 4px !important;
      font-size: 1.2rem;
    }

    .lp .lpActionsCell {
      display: none;
    }

    .lp .lpQtyCell {
      display: none;
    }

    .lpList {
      padding-bottom: 3em !important;
    }

    .lp .lpName, .lpItemsFooter .lpName {
      flex: 1 1 180px !important;
    }

    .lp .lpDescription {
      margin-left: 1em;
    }
`

export default GlobalStyle
