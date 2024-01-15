import React, { useState } from "react";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Grid,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { Stack } from "@mui/system";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import { styled } from "@mui/material/styles";

const data = [
  {
    No: 1,
    Departments: "LETTER MOULDING",
    CPD_IA: {
      "Depth of Material": ["No"],
      "Surface Finish": ["No"],
      "Edges and Side Finish": ["No"],
      Quantity: ["No"],
      Workmanship: ["No"],
    },
  },
  {
    No: 2,
    Departments: "METAL FABRICATION",
    CPD_IA: {
      "Material Type / Size": ["No"],
      "Stretcheral Support": ["No"],
      "Surface Finish": ["No"],
      "Fixing Methods & Assembly": ["No"],
      Quantity: ["No"],
    },
  },
  {
    No: 3,
    Departments: "CNC LASER CUTTING",
    CPD_IA: {
      "Verify Cutting Files": ["No"],
      "Material Types": ["No"],
      "Cutting Quality": ["No"],
      Quantity: ["No"],
    },
    Thickness: "Some Thickness",
    Brand: "Some Brand",
  },
  {
    No: 4,
    Departments: "SANDING",
    CPD_IA: {
      "Surface Finish": ["No"],
      "Powder Costing Coat": ["No"],
      Workmanship: ["No"],
    },
    "Dents or Holes": "Some Dents",
    "Surface Roughness": "Some Roughness",
  },
  {
    No: 5,
    Departments: "PAINTING",
    CPD_IA: {
      "Colour / Coat": ["No"],
      "Surface Finish": ["No"],
      Quantity: ["No"],
      Workmanship: ["No"],
    },
    Sanding: "Sanding Details",
    "Scratches or Uneven Finish": "Scratches Details",
    "Dust Related Reasons": "Dust Reasons",
  },
  {
    No: 6,
    Departments: "VINYL / GRAPHICS / SCREENPRINTING",
    CPD_IA: {
      "Material Specification": ["No"],
      "Surface Finish": ["No"],
      "Print Quality": ["No"],
      Workmanship: ["No"],
    },
    "Dust Related Reasons": "Dust Reasons",
    "Bubbles or Wrinkles": "Bubbles or Wrinkles Details",
  },
  {
    No: 7,
    Departments: "ACRYLIC",
    CPD_IA: {
      "Material Specification": ["No"],
      "Surface Finish": ["No"],
      Quantity: ["No"],
      Fixing: ["No"],
      Workmanship: ["No"],
    },
    "Dust Related Reasons": "Dust Reasons",
    Joints: "Joint Details",
    Polishing: "Polishing Details",
    "Levelling of Facia": "Levelling Details",
    Adhesive: "Adhesive Details",
  },
  {
    No: 8,
    Departments: "ELECTRICALS",
    CPD_IA: {
      "LED Brand": ["No"],
      "KELVIN temperature & illumination": ["No"],
      "Verify Electrical Components": ["No"],
      "Visual Checkup (Darkspots)": ["No"],
      Quantity: ["No"],
    },
  },
  {
    No: 9,
    Departments: "Polishing",
    CPD_IA: {
      "Surface Finish": ["No"],
      Workmanship: ["No"],
    },
    Grinding: "Grinding Details",
    "Uneven Finish": "Uneven Finish Details",
  },
  {
    No: 10,
    Departments: "PACKAGING",
    CPD_IA: {
      Cleaning: ["No"],
      "Physical Damages": ["No"],
      Quantity: ["No"],
      Workmanship: ["No"],
    },
  },
  {
    No: 11,
    Departments: "OUTSOURCED & FIXING MATERIALS",
    CPD_IA: {
      "Material Specification": ["No"],
      "Surface Finish": ["No"],
      Quantity: ["No"],
      Workmanship: ["No"],
    },
    Comments: "Comments Details",
    "NCR Report": "NCR Report Details",
  },
];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const CustomersTable = () => {
  const [switchValues, setSwitchValues] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSwitchChange = (itemNo, key, value) => {
    setSwitchValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [itemNo]: {
          ...prevValues[itemNo],
          [key]: value,
        },
      };

      // Open the dialog if the switch is changed to "Yes"
      if (value && !prevValues[itemNo]?.[key]) {
        setOpenDialog(true);
        setSelectedItem({ itemNo, key });
      }

      return updatedValues;
    });
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const getSwitchValue = (itemNo, key, defaultValue) => {
    return switchValues[itemNo] ? switchValues[itemNo][key] || defaultValue : defaultValue;
  };

  const getSwitchLabel = (itemNo, key, defaultLabel) => {
    // Replace defaultLabel with a dynamic label based on the switch state if needed
    return defaultLabel;
  };

  const renderSwitch = (itemNo, key, value, label) => (
    <React.Fragment>
      <Switch
        color="primary"
        checked={getSwitchValue(itemNo, key, value === 'Yes')}
        onChange={(event) => handleSwitchChange(itemNo, key, event.target.checked)}
      />
      <span></span> {/* Display the label dynamically */}
    </React.Fragment>
  );

  const handleUpload = () => {
    // Handle the file upload logic here
    // You can access the selected item and key using selectedItem.itemNo and selectedItem.key
    // Reset the dialog state after handling the upload
    setOpenDialog(false);
    setSelectedItem(null);
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">Sl.No</TableCell>
                <TableCell>Departments</TableCell>
                <TableCell colSpan={4}>Checklist per Department / Inspection Areas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data.map((item) => (
                <TableRow key={item.No}>
                  <TableCell>{item.No}</TableCell>
                  <TableCell>{item.Departments}</TableCell>
                  {/* Render CPD_IA columns dynamically */}
                  {Object.keys(item.CPD_IA).map((key) => (
                    <TableCell key={key}>
                      {key}<br/>{renderSwitch(item.No, key, item.CPD_IA[key][0])} {item.CPD_IA[key][0]}
                    </TableCell>
                  ))}
                  {/* Render other properties dynamically */}
                  <TableCell>{item.Thickness || '-'}</TableCell>
                  <TableCell>{item.Brand || '-'}</TableCell>
                  {/* Add more cells for additional properties */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>

      {/* Upload Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Reason</DialogTitle>
        <DialogContent>
        <Box sx={{ m: 2 }}>
        <Grid container spacing={2}>
            <Grid xs={12} pb={3}>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="email"
                    label="Command"
                    type="email"
                    fullWidth
                    variant="standard"
                  />
            </Grid>
            <Grid xs={12} >
            <Button component="label" variant="contained" startIcon={<ArrowUpOnSquareIcon />}>
                          Upload file
                          <VisuallyHiddenInput type="file" />
                        </Button>
            </Grid>
          </Grid>
     </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
