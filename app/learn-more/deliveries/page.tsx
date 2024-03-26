import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const DeliveriesPage = () => {
  return (
    <section className="min-h-screen mb-10">
      <Card>
        <CardHeader>
          <CardTitle>Free Deliveries</CardTitle>
          <CardDescription>Terms and Conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-decimal px-6">
            <li>
              Eligibility: Free delivery is available only for orders with a
              shipping address within South Africa.
            </li>

            <li>
              Order Requirements: To qualify for free delivery, the total order
              value must meet the minimum purchase requirement specified on our
              website.
            </li>

            <li>
              Exclusions: Free delivery applies only to standard shipping
              methods within South Africa. Expedited or express shipping options
              may incur additional charges.
            </li>

            <li>
              Delivery Timelines: While we strive to deliver orders promptly,
              please note that delivery times may vary depending on factors such
              as location, courier availability, and product availability.
            </li>

            <li>
              Modification or Discontinuation: We reserve the right to modify or
              discontinue free delivery at any time without prior notice. Any
              changes to our free delivery policy will be reflected on our
              website.
            </li>

            <li>
              Additional Charges: Additional charges may apply for special
              delivery requests, including but not limited to delivery to remote
              areas, redirection of packages, or failed delivery attempts due to
              incorrect address information provided by the customer.
            </li>

            <li>
              Promotional Offers: From time to time, we may offer promotional
              codes or special offers that include free delivery. Such offers
              are subject to their specific terms and conditions and may have
              expiration dates.
            </li>

            <li>
              General Terms: Our standard terms and conditions, including those
              related to orders, shipping, returns, and refunds, apply to all
              orders, including those eligible for free delivery.
            </li>

            <li>
              Contact Us: If you have any questions or concerns regarding our
              free delivery policy or any other aspect of your order, please
              contact our customer service team for assistance.
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};

export default DeliveriesPage;
