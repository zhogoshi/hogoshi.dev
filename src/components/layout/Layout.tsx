import { Bottombar } from "../bottombar/Bottombar";
import { PageTransition } from "../page-transition/PageTransition";
import styled from '@emotion/styled';

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 60px);
`;

const MainContent = styled.div`
  width: 100%;
  height: 100%;
`;

interface LayoutProps {
    children: React.ReactNode
    bottombar?: boolean
}

export default function Layout({ children, bottombar = true }: LayoutProps) {
  return (
    <MainContent>
      {bottombar && <Bottombar />}
      <ContentWrapper>
        <PageTransition>
          {children}
        </PageTransition>
      </ContentWrapper>
    </MainContent>
  )
}