import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

const ExchangePolicyPage = () => {
  return (
    <section className="min-h-screen mb-10">
      <Card className="border-none">
        <CardHeader>
          <CardTitle>externalwear </CardTitle>
          <CardDescription>Exchange Policy</CardDescription>
        </CardHeader>
        <CardContent>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Exchange Policy</CardTitle>
          </CardHeader>
          <p>
            We want you to be completely satisfied with your purchase. If for
            any reason you are not, we offer exchanges within 3 days of
            receiving your order. Please review the following terms and
            conditions for our exchange policy.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Eligibility</CardTitle>
          </CardHeader>
          <p>
            To be eligible for an exchange, items must be unused, unworn, and in
            the same condition as received, with all original tags and packaging
            intact.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Exchanges Only</CardTitle>
          </CardHeader>
          <p>
            We only accept exchanges for items of the same or greater value. If
            you wish to exchange for an item of greater value, you will be
            responsible for paying the price difference.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Exclusions</CardTitle>
          </CardHeader>
          <p>
            Certain items, such as personalized or custom-made products, are not
            eligible for exchange unless they are defective or damaged upon
            arrival.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Exchange Process</CardTitle>
          </CardHeader>
          <p>
            To initiate an exchange, please contact our customer service team
            within 3 days of receiving your order. We will provide you with
            instructions on how to return the item(s) for exchange.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Return Shipping</CardTitle>
          </CardHeader>
          <p>
            Customers are responsible for the cost of return shipping. We
            recommend using a trackable shipping method to ensure the safe
            return of your item(s). We do not reimburse shipping costs for
            returned items.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Processing Time</CardTitle>
          </CardHeader>
          <p>
            Once we receive your returned item(s), please allow 7 business days
            for us to process the exchange and ship out your replacement
            item(s).
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">
              Damaged or Defective Items
            </CardTitle>
          </CardHeader>
          <p>
            If you receive a damaged or defective item, please contact us
            immediately to arrange for a replacement or refund.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">
              Non-Exchangeable Items
            </CardTitle>
          </CardHeader>
          <p>
            We do not accept exchanges for items purchased during clearance
            sales or promotional events, unless they are defective or damaged
            upon arrival.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Exchange Period</CardTitle>
          </CardHeader>
          <p>
            Exchanges must be requested within 3 days of receiving your order.
            We reserve the right to refuse exchanges requested outside of this
            time frame.
          </p>

          <CardHeader className="px-0">
            <CardTitle className="font-medium">Contact Us</CardTitle>
          </CardHeader>
          <p>
            If you have any questions or concerns about our exchange policy or
            need assistance with an exchange, please contact our customer
            service team for prompt assistance.{" "}
            <Link className="underline" href="/support">
              Contact Us
            </Link>
            . .
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default ExchangePolicyPage;
