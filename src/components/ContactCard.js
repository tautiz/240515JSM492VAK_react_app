import '../styles/contactCard.css';

function ContactCard({ name, phone, email }) {

    return (
      <div className="card group hover:scale-105 transition-transform duration-300">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 dark:bg-primary/10 flex items-center justify-center text-primary dark:text-primary-light group-hover:bg-primary group-hover:text-white transition-colors">
            {name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
            <div className="mt-2 space-y-1">
              <p className="flex items-center text-gray-600 dark:text-gray-400">
                <span className="mr-2">📞</span>
                {phone}
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-400">
                <span className="mr-2">✉️</span>
                {email}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ContactCard;