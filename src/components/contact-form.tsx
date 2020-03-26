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
      action="/contact?form-success=true"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p>
        <label>
          Name <input type="text" name="name" />
        </label>
      </p>
      <p>
        <label>
          Email <input type="email" name="email" />
        </label>
      </p>
      <p>
        <label>
          Message <textarea rows={5} cols={60} name="message" />
        </label>
      </p>
      <p>
        <button type="submit">Send</button>
        {success && (
          <SuccessFormMessage>
            The form was succesfully submitted, thank you!
          </SuccessFormMessage>
        )}
      </p>
    </form>
  )
}

export default ContactForm
