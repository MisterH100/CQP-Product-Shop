import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

const DeliveriesPage = () => {
  return (
    <section className="min-h-screen mb-10">
      <Card className="border-none">
        <CardHeader>
          <CardTitle>externalwear</CardTitle>
          <CardDescription>Deliveries</CardDescription>
        </CardHeader>
        <CardContent>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Eligibility</CardTitle>
          </CardHeader>
          <p>
            Free delivery is available only for orders with a shipping address
            within South Africa.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Order Requirements</CardTitle>
          </CardHeader>
          <p>
            To qualify for free delivery, the total order value must meet the
            minimum purchase requirement specified on our website.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Exclusions</CardTitle>
          </CardHeader>
          <p>
            Free delivery applies only to standard shipping methods within South
            Africa. Expedited or express shipping options may incur additional
            charges.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Delivery Timelines</CardTitle>
          </CardHeader>
          <p>
            While we strive to deliver orders promptly, please note that
            delivery times may vary depending on factors such as location,
            courier availability, and product availability.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">
              Modification or Discontinuation
            </CardTitle>
          </CardHeader>
          <p>
            We reserve the right to modify or discontinue free delivery at any
            time without prior notice. Any changes to our free delivery policy
            will be reflected on our website.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Additional Charges</CardTitle>
          </CardHeader>
          <p>
            Additional charges may apply for special delivery requests,
            including but not limited to delivery to remote areas, redirection
            of packages, or failed delivery attempts due to incorrect address
            information provided by the customer.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Promotional Offers</CardTitle>
          </CardHeader>
          <p>
            From time to time, we may offer promotional codes or special offers
            that include free delivery. Such offers are subject to their
            specific terms and conditions and may have expiration dates.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">General Terms</CardTitle>
          </CardHeader>
          <p>
            Our standard terms and conditions, including those related to
            orders, shipping, returns, and refunds, apply to all orders,
            including those eligible for free delivery.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Contact Us</CardTitle>
          </CardHeader>
          <p>
            If you have any questions or concerns regarding our free delivery
            policy or any other aspect of your order, please contact our
            customer service team for assistance.{" "}
            <Link className="underline" href="/support">
              Contact Us
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default DeliveriesPage;
