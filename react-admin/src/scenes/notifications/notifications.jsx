import { MenuItem, Menu } from "@mui/material";

const Notifications = ({
  anchorEl,
  open,
  handleClose,
  notifications,
  colors,
}) => {
  return (
    
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {notifications.map((notification) => (
          <MenuItem key={notification.id}>
            {notification.notificationType} - {notification.message}
          </MenuItem>
        ))}
      </Menu>

  );
};

export default Notifications;
