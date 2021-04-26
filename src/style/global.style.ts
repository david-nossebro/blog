import { createGlobalStyle } from "styled-components"
import { rhythm } from "../utils/typography"

const GlobalStyle = createGlobalStyle`
  a {
    color: #1daa2c
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
`

export default GlobalStyle
