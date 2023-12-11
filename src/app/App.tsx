import { Header } from "@/components/header";
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
            <Suspense fallback={<div>Loading...</div>}>
              <EventsPage />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};
