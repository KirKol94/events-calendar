import { Header } from "@/components/header";
import { Loader } from "@/components/loader";
import { NotFoundPage } from "@/pages/notFountPage";
import { lazy } from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const EventsPage = lazy(() => import("@/pages/eventsPage/EventsPage"));

export const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <EventsPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
