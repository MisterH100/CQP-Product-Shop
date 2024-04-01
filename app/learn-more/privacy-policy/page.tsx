import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

const PrivacyPolicyPage = () => {
  return (
    <section className="min-h-screen mb-10">
      <Card className="border-none">
        <CardHeader>
          <CardTitle>externalwear </CardTitle>
          <CardDescription>externalwear privacy policy</CardDescription>
        </CardHeader>
        <CardContent>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Privacy Policy</CardTitle>
          </CardHeader>
          <p>
            externalwear Team operates externalwear .This page informs you of
            our policies regarding the collection, use, and disclosure of
            personal data when you use our site and the choices you have
            associated with that data. We use your data to provide and improve
            the site. By using the site, you agree to the collection and use of
            information in accordance with this policy.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">
              Information Collection and Use
            </CardTitle>
          </CardHeader>
          <p>
            We collect several different types of information for various
            purposes to provide and improve our service to you.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">
              Types of Data Collected
            </CardTitle>
          </CardHeader>
          <p>
            While using our site, we may ask you to provide us with certain
            personally identifiable information that can be used to contact or
            identify you.Personally identifiable information may include, but is
            not limited to:
          </p>
          <ul className="list-disc px-6">
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address</li>
          </ul>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Use of Data</CardTitle>
          </CardHeader>
          <p>
            We use the collected data for various purposes, including but not
            limited to:
          </p>
          <ul className="list-disc px-6">
            <li>To provide and maintain our site</li>
            <li>To notify you about changes to our site</li>
            <li>
              To allow you to participate in interactive features of our site
              when you choose to do so
            </li>
            <li>To provide customer care and support</li>
            <li>
              To provide analysis or valuable information so that we can improve
              our site
            </li>
            <li>To monitor the usage of our site</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Disclosure of Data</CardTitle>
          </CardHeader>
          <p>
            We do not sell, trade, or otherwise transfer your Personal Data to
            third parties. This does not include trusted third parties who
            assist us in operating our Site, conducting our business, or
            servicing you, so long as those parties agree to keep this
            information confidential. We may also release your information when
            we believe release is appropriate to comply with the law, enforce
            our site policies, or protect ours or others' rights, property, or
            safety.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Security of Data</CardTitle>
          </CardHeader>
          <p>
            We take reasonable measures to protect the security of your personal
            information from unauthorized access, use, or disclosure. However,
            please be aware that no method of transmission over the internet or
            electronic storage is 100% secure, and we cannot guarantee absolute
            security.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Your Rights</CardTitle>
          </CardHeader>
          <p>
            You have the right to access, correct, or delete your personal
            information. You may also opt-out of receiving promotional emails
            from us by following the instructions provided in those emails.
            Please note that even if you opt-out of receiving marketing
            communications, we may still send you transactional or
            administrative messages regarding your orders or account.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">
              Changes to this Privacy Policy
            </CardTitle>
          </CardHeader>
          <p>
            We reserve the right to update or change this Privacy Policy at any
            time. Any changes will be effective immediately upon posting the
            revised Privacy Policy on our website. We encourage you to review
            this Privacy Policy periodically for any updates or changes.
          </p>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">Contact Us</CardTitle>
          </CardHeader>
          <p>
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us at:{" "}
            <Link href="mailto:thehandsomedevservices@gmail.com">
              thehandsomedevservices@gmail.com
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default PrivacyPolicyPage;
