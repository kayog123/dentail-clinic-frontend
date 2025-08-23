import Wrapper from "./wrapper";

export default function Footer() {
  return (
    <footer className="bg-white">
      <Wrapper className="py-12 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <p className="text-gray-500 text-base leading-relaxed">
              Kayog is a free and open-source{" "}
              <a
                href="https://github.com/kayog-team/kayog"
                className="text-gray-900 hover:text-gray-600"
              >
                Kayog Dental Care
              </a>{" "}
              project. Kayog is a framework for building and deploying
              serverless applications on AWS.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Services
                </h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex">
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                      Request Appointment
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex">
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                      About
                    </a>
                  </li>
                  <li className="flex">
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex">
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                      Privacy
                    </a>
                  </li>
                  <li className="flex">
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Social
                </h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex">
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                      Facebook
                    </a>
                  </li>
                  <li className="flex">
                    <a href="#" className="text-gray-500 hover:text-gray-900">
                      Twitter
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
}
