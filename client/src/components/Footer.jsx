export default function Footer() {
  return (
    <>
      <div className="bg-[#2c3e50] text-white p-10 grid grid-cols-1 md:grid-cols-5 gap-6">
        <div>
          <h3 className="font-bold mb-2">Contact Info</h3>
          <p>ServiceSync Technologies</p>
          <p>Gujarat, India</p>
          <p>+91-XXXXXXXXXX</p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Important Links</h3>
          <p>About Us</p>
          <p>Reviews</p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Resources</h3>
          <p>Blog</p>
          <p>Help Center</p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Policies</h3>
          <p>Privacy Policy</p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Safety</h3>
          <p>Guidelines</p>
        </div>
      </div>

      <div className="bg-[#1a252f] text-white text-center p-3">
         © 2026 ServiceSync. All rights reserved.
      </div>
    </>
  );
}

