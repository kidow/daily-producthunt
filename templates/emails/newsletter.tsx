import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text
} from '@react-email/components'
import * as React from 'react'

interface Props {
  id: number
  title: string
  name: string
  intro: string
  coverUrl: string
}

export const Newsletter = ({
  id,
  title = '타이틀',
  name = '일간 ProductHunt',
  intro = '매일매일 선별된 ProductHunt 콘텐츠를 가져다 주는 웹서비스',
  coverUrl = 'https://daily-producthunt.dongwook.kim/opengraph-image.png?c7b23718c68e315c'
}: Props) => {
  return (
    <Html lang="ko">
      <Head>
        <Font
          fontFamily="Pretendard-Regular"
          fallbackFontFamily="sans-serif"
          fontWeight={400}
          webFont={{
            url: 'https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff',
            format: 'woff'
          }}
          fontStyle="normal"
        />
      </Head>
      <Preview>{title}</Preview>
      <Tailwind
        config={{ theme: { extend: { colors: { brand: '#FF6154' } } } }}
      >
        <Body className="bg-white">
          <Container>
            <Section className="h-20">
              <Row>
                <Column>
                  <Img
                    src="https://daily-producthunt.dongwook.kim/logo-circle.png"
                    className="h-10 w-10"
                  />
                </Column>
              </Row>
            </Section>
            <Section className="border border-neutral-200 border-solid rounded overflow-hidden">
              <Section>
                <Img className="w-full" src={coverUrl} />
              </Section>
              <Section className="pt-5 px-10">
                <Text className="text-2xl font-bold">{name}</Text>
                <Text className="text-lg">{intro}</Text>
              </Section>
              <Section className="text-center pb-5">
                <Text>
                  <Link
                    href={`https://daily-producthunt.dongwook.kim/product/${id}?ref=email`}
                    className="py-2.5 px-5 text-white bg-brand cursor-pointer font-semibold rounded"
                  >
                    보러 가기
                  </Link>
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default Newsletter
