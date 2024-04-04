import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Logo from "../../assets/logo.png";

// Create styles
const styles = StyleSheet.create({
  rowView: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid #EEE",
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: "center",
    margin: "0px 10px",
  },
});

// Create Document Component
const InvoicePDF = (props) => (
  <Document>
    <Page size="A4" style={{ paddingBottom: "60px" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "20px",
          marginBottom: "20px",
        }}
        fixed
      >
        <Image src={Logo} style={{ width: "360px" }} />
        <View
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={{
              fontSize: "10px",
              fontWeight: "900",
            }}
          >
            Hardware, Machine Tools, Hand Tools, Power Tools,
          </Text>
          <Text
            style={{
              fontSize: "10px",
              fontWeight: "900",
            }}
          >
            Pneumatic Tools, Measuring Equipments,
          </Text>
          <Text
            style={{
              fontSize: "10px",
              fontWeight: "900",
            }}
          >
            Workshop Equipments & General Order Suppliers.
          </Text>
        </View>
      </View>
      <View style={{ margin: "40px" }}>
        <Text
          style={{
            fontSize: "10px",
          }}
        >
          Customer: {props.customerName}
        </Text>
        <Text
          style={{
            fontSize: "10px",
          }}
        >
          Credit Terms: {props.creditTerms}
        </Text>
      </View>
      <View>
        <View style={styles.rowView}>
          <Text style={{ width: "12.5%", fontSize: "10px" }}>SR.</Text>
          <Text style={{ width: "12.5%", fontSize: "10px" }}>Name</Text>
          <Text style={{ width: "12.5%", fontSize: "10px" }}>Quantity</Text>
          <Text style={{ width: "12.5%,", fontSize: "10px" }}>Rate</Text>
          <Text style={{ width: "12.5%", fontSize: "10px" }}>Sales Tax %</Text>
          <Text style={{ width: "12.5%", fontSize: "10px" }}>
            Total Without Tax
          </Text>
          <Text style={{ width: "12.5%", fontSize: "10px" }}>Tax Amount</Text>
          <Text style={{ width: "12.5%", fontSize: "10px" }}>
            Total With Tax
          </Text>
        </View>
        {props.itemListing.map((rowData, index) => (
          <>
            <View style={styles.rowView}>
              <Text style={{ width: "12.5%", fontSize: "10px" }}>
                {index + 1}
              </Text>
              <Text style={{ width: "12.5%", fontSize: "10px" }}>
                {rowData.name}
              </Text>
              <Text style={{ width: "12.5%", fontSize: "10px" }}>
                {rowData.quantity}
              </Text>
              <Text style={{ width: "12.5%", fontSize: "10px" }}>
                {rowData.rate}
              </Text>
              <Text style={{ width: "12.5%", fontSize: "10px" }}>
                {rowData.taxPercentage}%
              </Text>
              <Text style={{ width: "12.5%", fontSize: "10px" }}>
                {rowData.totalWithoutTax}
              </Text>
              <Text style={{ width: "12.5%", fontSize: "10px" }}>
                {rowData.taxAmount}
              </Text>
              <Text style={{ width: "12.5%", fontSize: "10px" }}>
                {rowData.totalWithTax}
              </Text>
            </View>
          </>
        ))}
      </View>
      <View
        style={{
          margin: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            fontSize: "10px",
          }}
        >
          Total without tax: {props.totalWithoutTax}
        </Text>
        <Text
          style={{
            fontSize: "10px",
          }}
        >
          Tax: {props.taxAmount}
        </Text>
        <Text
          style={{
            fontSize: "10px",
          }}
        >
          Total with tax: {props.totalWithTax}
        </Text>
      </View>
      <View
        style={{
          borderTop: "2px black solid",
          bottom: 0,
          left: 0,
          position: "absolute",
          width: "100%",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
        }}
        fixed
      >
        <Text
          style={{
            fontSize: "10px",
            marginTop: "5px",
          }}
        >
          Amin Market, 11 - Nishtar (Brandreth) Road, Lahore - Pakistan.
        </Text>
        <Text
          style={{
            fontSize: "10px",
          }}
        >
          Tel: ++92-42-37663489, 37668995 Fax: ++92-42-37635775 E-mail:
          pitc_umer@hotmail.com
        </Text>
      </View>
    </Page>
  </Document>
);
export default InvoicePDF;
