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
                <Suspense fallback={<LoadingLayout />}>
                  <Layout Children={<Page />}>
                  </Layout>
                </Suspense>
              ) : (
                <Suspense fallback={<LoadingLayout />}>
                  <Layout />
                </Suspense>
              )
            }
            />
          })}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
