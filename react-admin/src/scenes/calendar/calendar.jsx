import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useAtom } from "jotai";
import { requests } from "../../data/dataAtom";
import { useEffect, useState } from "react";
const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [currentEvents, setCurrentEvents] = useState([]);

  const [refreshEvents, setRefreshEvents] = useState(false);
  const [events, setEvents] = useState();
  console.log(events);
  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
      setTimeout(async () => {
        requests.PostJson("Events/add", {
          title: title,
          date: selected.start,
          start: selected.start,
          end: selected.end,
        });
      }, 100);
      setTimeout(() => {
        setRefreshEvents(!refreshEvents);
      }, 200);
    }
  };

  const handleEventClick = (selected) => {
    console.log(selected);
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };
  useEffect(() => {
    requests.Get("Events/getAll").then((result) => {
      setEvents(result);
    });
  }, [refreshEvents]);
  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Administreaza Calendar" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {events !== undefined &&
              events.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.purpleAccent[700],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>{event.start.split("T")[0]}</Typography>
                    }
                  />
                </ListItem>
              ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          {events !== undefined && (
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              // eventsSet={(events) => setCurrentEvents(events)}
              initialEvents={events}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
