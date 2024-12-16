import React from "react";
import { Box } from "@mui/system";

const MapPage = () => {
  return (
    <Box>
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799181496!2d-74.25987571760744!3d40.69767006358627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af18b60165%3A0x8b621f8a7a7d28a4!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1633452834502!5m2!1sen!2s"
        style={{ flex: 1, border: 0 }}
        allowFullScreen
        loading="lazy"
      />
    </Box>
  );
};

export default MapPage;