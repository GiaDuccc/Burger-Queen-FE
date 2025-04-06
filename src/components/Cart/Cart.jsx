// ShoppingCart.js
import { Drawer, Box, List, ListItem, ListItemText, Typography } from '@mui/material';

function ShoppingCart({ open, toggleDrawer }) {
  return (
    <Drawer
      anchor="right" // Drawer sẽ trượt từ phải
      open={open} // Điều kiện mở/đóng
      onClose={toggleDrawer} // Đóng Drawer khi nhấn ngoài
    >
      <Box sx={{ width: 250, padding: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Your Cart
        </Typography>
        <List>
          {/* Danh sách sản phẩm */}
          <ListItem>
            <ListItemText primary="Item 1" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Item 2" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Item 3" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default ShoppingCart;
