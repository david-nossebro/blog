import React from "react"
import {
  Facebook,
  Instagram,
  Youtube,
  Slack,
  Gmail,
} from "@icons-pack/react-simple-icons"
import { FaPhoneAlt } from "react-icons/fa"
import styled from "styled-components"
import { css } from "styled-components"
const iconStyle = css`
  width: 3em;
  height: 3em;
  margin-right: 1em;
`

const FacebookIcon = styled(Facebook)`
  ${iconStyle}
`

const InstagramIcon = styled(Instagram)`
  ${iconStyle}
`

const YoutubeIcon = styled(Youtube)`
  ${iconStyle}
`

const SlackIcon = styled(Slack)`
  ${iconStyle}
`

const GmailIcon = styled(Gmail)`
  ${iconStyle}
`

const PhoneIcon = styled(FaPhoneAlt)`
  ${iconStyle}
`

const IconLink = styled.a`
  box-shadow: none;
`

interface SocialLinkProps {
  type: string
  href: string
}

const SocialLink = ({ type, href }: SocialLinkProps): JSX.Element => {
  let socialIcon: JSX.Element
  switch (type) {
    case "instagram":
      socialIcon = <InstagramIcon color="#E4405F" />
      break
    case "facebook":
      socialIcon = <FacebookIcon color="#1877F2" />
      break
    case "youtube":
      socialIcon = <YoutubeIcon color="#FF0000" />
      break
    case "slack":
      socialIcon = <SlackIcon color="#4A154B" />
      break
    case "mail":
      socialIcon = <GmailIcon color="#D14836" />
      break
    case "phone":
      socialIcon = <PhoneIcon color="#056932" />
      break
    default:
      socialIcon = <GmailIcon color="#D14836" />
  }

  return (
    <IconLink href={href} target="_blank" rel="noopener noreferrer">
      {socialIcon}
    </IconLink>
  )
}

export default SocialLink
