import React from "react"
import styled from "styled-components"

const SuccessFormMessage = styled.span`
  color: green;
  margin-left: 0.5em;
`

interface ContactFormProps {
  success: boolean
}

const ContactForm = ({ success }: ContactFormProps): JSX.Element => {
  return (
    <form
      name="contact"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      action="/contact/?form-success=true"
      method="POST"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p>
        <label>
          Namn <input type="text" name="name" />
        </label>
      </p>
      <p>
        <label>
          Epost <input type="email" name="email" />
        </label>
      </p>
      <p>
        <label>
          Meddelande <textarea rows={5} cols={60} name="message" />
        </label>
      </p>
      <p>
        <button type="submit">Skicka</button>
        {success && (
          <SuccessFormMessage>
            Meddelandet har skickats, tack så mycket!
          </SuccessFormMessage>
        )}
      </p>
    </form>
  )
}

export default ContactForm
