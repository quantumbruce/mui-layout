import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";

import {
  Root,
  Header,
  EdgeTrigger,
  EdgeSidebar,
  SidebarContent,
  Content,
  Footer,
  getStandardScheme,
  getFixedScheme,
  getContentBasedScheme,
  getCozyScheme
} from "@mui-treasury/layout";
import {
  HeaderMockup,
  ContentMockup,
  FooterMockup,
  NavSidebarMockup
} from "@mui-treasury/mockup/layout";
import { SideNavUserInfo } from "@mui-treasury/mockup/dashboard";

import Menu from "@mui/icons-material/Menu";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import ContentForm from "./components/ContentForm";

const presets = {
  createStandardLayout: getStandardScheme(),
  createFixedLayout: getFixedScheme(),
  createContentBasedLayout: getContentBasedScheme(),
  createCozyLayout: getCozyScheme()
};

const LayoutV5 = () => {
  const [loading, setLoading] = useState(false);
  const [preset, setPreset] = useState("createStandardLayout");
  const [data, setData] = useState({
    header: true,
    nav: true,
    content: true,
    footer: true
  });

  return loading ? (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography variant={"h2"}>Changing Preset...</Typography>
    </div>
  ) : (
    <Root scheme={presets[preset]}>
      <CssBaseline />
      <Header>
        {data.header ? (
          <HeaderMockup
            trigger={
              <EdgeTrigger target={{ anchor: "left", field: "open" }}>
                {(open, setOpen) => (
                  <IconButton onClick={() => setOpen(!open)} edge="end">
                    {open ? <KeyboardArrowLeft /> : <Menu />}
                  </IconButton>
                )}
              </EdgeTrigger>
            }
          />
        ) : (
          <EdgeTrigger target={{ anchor: "left", field: "open" }}>
            {(open, setOpen) => (
              <IconButton onClick={() => setOpen(!open)} edge="end">
                {open ? <KeyboardArrowLeft /> : <Menu />}
              </IconButton>
            )}
          </EdgeTrigger>
        )}
      </Header>
      <EdgeSidebar anchor="left">
        {({ state }) => (
          <>
            <SidebarContent>{data.nav && <NavSidebarMockup />}</SidebarContent>
            <SideNavUserInfo collapsed={state.leftEdgeSidebar?.collapsed} />
            <EdgeTrigger target={{ anchor: "left", field: "collapsed" }}>
              {(collapsed, setCollapsed) => (
                <ButtonBase
                  onClick={() => setCollapsed(!collapsed)}
                  sx={{ flexGrow: 1, height: 48 }}
                >
                  {collapsed ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </ButtonBase>
              )}
            </EdgeTrigger>
          </>
        )}
      </EdgeSidebar>
      <Content>
        <Container maxWidth="md" sx={{ pt: 2, pb: 5 }}>
          <Typography variant="h4" component="h1" color="primary">
            MUI Layout V5
          </Typography>
          <Typography sx={{ pb: 3 }}>
            Compatible with{" "}
            <code>
              <b>@mui/material(v5)</b>
            </code>
            , <b>NOT</b> <code>@material-ui/core</code>
          </Typography>
          <ContentForm
            preset={preset}
            onChangePreset={(val) => {
              setLoading(true);
              setPreset(val);
              setTimeout(() => setLoading(false), 500);
            }}
            data={data}
            onChangeData={setData}
          />
          {data.content && <ContentMockup />}
        </Container>
      </Content>
      <Footer>{data.footer && <FooterMockup />}</Footer>
    </Root>
  );
};

export default LayoutV5;
