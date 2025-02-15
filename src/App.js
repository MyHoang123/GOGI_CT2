import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/Routes';
import { Suspense } from "react";
import LoadingLayout from './components/Layout/LoadingLayout';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout;
            const Page = route.component;
            return <Route key={index} path={route.path} element={
              Page !== null ? (
                <Suspense fallback={<div className="loading">
                  <svg width="64px" height="48px">
                    <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
                    <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
                  </svg>
                </div>}>
                  <Layout Children={<Page />}>
                  </Layout>
                </Suspense>
              ) : (
                <Suspense fallback={<div className="loading">
                  <svg width="64px" height="48px">
                    <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
                    <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
                  </svg>
                </div>}>
                  <Layout />
                </Suspense>
              )
            }
            />
          })}
        </Routes>
        <LoadingLayout />
      </div>
    </Router>
  );
}
export default App;
