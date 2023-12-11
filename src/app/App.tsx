import { Header } from "@/components/header";
import { EventsPage } from "@/pages/eventsPage";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route index element={<EventsPage />} />
      </Routes>
    </>
  );
};
