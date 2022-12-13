import Head from 'next/head'
import { setCookie } from 'cookies-next'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

import { TOKEN_KEY, HASH_KEY } from '@/common/constants/cookies'
import { authApi } from '@/common/services/api'
import { passwordRule, emailRule, requiredRule } from '@/common/validationRules'

import Icon from '@/components/common/Icon'
import Partners from '@/components/Partners'
import Row from '@/components/common/Row'
import TelegramAuthButton from '@/components/common/TelegramAuthButton'
import Text from '@/components/common/Text'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import Input from '@/components/ui/Input'
import iconfb from '../images/icons/icon-facebook.svg'
import icongoogle from '../images/icons/icon-google.svg'

import DefaultLayout from '@/layouts/DefaultLayout'

import { fetchUserInfo } from '@/store/userSlice'

const RegisterModal = styled.div`
  background-color: var(--white);
  border-radius: 5px;
`

const ModalTitle = styled(Row)`
  border-bottom: 1px solid var(--divider);
`
const ModalBody = styled.div`
  max-width: 330px;
`

const ResetPasswordLink = styled.a`
  display: block;

  display: flex;
  align-items: center;

  width: fit-content;

  :hover {
    text-decoration: underline;
  }
`
const Subtext = styled(Text)`
  display: inline;
`
const SubtextLink = styled.a`
  cursor: pointer;

  color: var(--blue);

  &:hover {
    text-decoration: underline;
  }

  &:active,
  &:focus {
    color: var(--blue-dark);
  }
`
const Error = styled(Row)`
  border: 1px solid var(--red);
  border-radius: 3px;
  box-shadow: 0px 0px 0px 2px rgba(242, 29, 68, 0.2);

  padding: 0.5rem 1rem;
`

const Register = () => {
  const router = useRouter()
  const { redirect_url } = router.query
  // store dispatch
  const dispatch = useDispatch()

  // state
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation()

  const {
    register,
    watch,
    trigger,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  })

  const { email, password, repeatPassword } = watch()

  useEffect(() => {
    register('email', { pattern: emailRule, required: requiredRule })
    register('password', { minLength: passwordRule, required: requiredRule })
    register('repeatPassword', {
      minLength: passwordRule,
      required: requiredRule,
    })
  }, [register])

  // component actions
  const redirect = () => {
    router.push(redirect_url ?? process.env.NEXT_PUBLIC_API_URL)
  }

  const closeModal = () => router.back()

  const onSubmit = async (e) => {
    e.preventDefault()

    const isValid = await trigger()

    if (!isValid) return

    try {
      setIsLoading(true)

      const res = await authApi.token.getByRegister({
        data: {
          email,
          password,
          rpassword: repeatPassword,
        },
      })

      setCookie(TOKEN_KEY, res.token, {
        domain: process.env.NODE_ENV === 'production' ? '.adheart.me' : '',
      })
      setCookie(HASH_KEY, res.hash, {
        domain: process.env.NODE_ENV === 'production' ? '.adheart.me' : '',
      })

      dispatch(fetchUserInfo())

      closeModal()
      redirect()
    } catch (e) {
      setError(e.error)
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <DefaultLayout>
      <Head>
        <title>AD❤️.me - {t('registration')}</title>
        <meta
          property="og:title"
          content="AD❤️.me - Registration"
          key="title"
        />
      </Head>
      <RegisterModal title={t('authModalTitle')}>
        <ModalTitle
          className="px-4 py-3"
          alignItens="center"
          justifyContent="space-between"
        >
          <Text size="20" color="black">
            {t('modalRegisterTitle')}
          </Text>
        </ModalTitle>
        <ModalBody className="px-4 py-3">
          <TelegramAuthButton className="mb-2" callback={closeModal} />
          <a href="https://adheart.me/login/oauth?method=facebook">
            <Button className="fb mb-3" block>
              <Image
                src={iconfb}
                alt="Landscape picture"
                width={20}
                height={20}
              />
              {t('loginFB')}
            </Button>
          </a>
          <a href="https://adheart.me/login/oauth?method=google">
            <Button className="google mb-3" block>
              <Image
                src={icongoogle}
                alt="Landscape picture"
                width={20}
                height={20}
              />
              {t('loginGoogle')}
            </Button>
          </a>
          <Row className="mb-3" alignItems="center">
            <Divider />
            <Text className="mx-3" color="black" size="14">
              {t('or')}
            </Text>
            <Divider />
          </Row>
          {!!error && (
            <Error className="mb-3" alignItems="center">
              <Icon className="mr-1" icon="warning" color="red" />
              <Text size="14" color="red">
                {error.message}
              </Text>
            </Error>
          )}
          <form className="mb-3">
            <Input
              id="email"
              className="mb-2"
              type="email"
              placeholder="Email"
              tooltipMessage={errors?.email?.message}
              isError={Boolean(errors?.email?.message)}
              onChange={(e) => setValue('email', e.target.value)}
              onClick={() => clearErrors('email')}
            />
            <Input
              id="password"
              className="mb-2"
              type="password"
              placeholder="Password"
              tooltipMessage={errors?.password?.message}
              isError={Boolean(errors?.password?.message)}
              onChange={(e) => setValue('password', e.target.value)}
              onClick={() => clearErrors('password')}
            />
            <Input
              id="rpassword"
              className="mb-4"
              type="password"
              placeholder="Repeat Password"
              tooltipMessage={errors?.repeatPassword?.message}
              isError={Boolean(errors?.repeatPassword?.message)}
              onChange={(e) => setValue('repeatPassword', e.target.value)}
              onClick={() => clearErrors('repeatPassword')}
            />
            <Button
              className="mx-auto"
              filled
              isLoading={isLoading}
              minWidth="100"
              onClick={onSubmit}
            >
              {t('registration')}
            </Button>
          </form>
          <Subtext size="12">
            <span>{t('registerModalSubText')}&nbsp;</span>
            <SubtextLink href="https://adheart.me/agreement/">
              {t('termsOfContidions')}
            </SubtextLink>
          </Subtext>
        </ModalBody>
      </RegisterModal>
    </DefaultLayout>
  )
}

export default Register
