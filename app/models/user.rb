class User < ActiveRecord::Base
	has_many :scores
	attr_accessor :password
	before_save :encrypt_password

	validates_confirmation_of :password
	# validate_presence_of :password, :on => :create
	# validate_presence_of :email
	# validate_uniqueness_of :email

	def self.authenticate name, password
		user = find_by_name(name)
		if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
			user
		else
			nil
		end
	end

	def encrypt_password
		if password.present?
			self.password_salt = BCrypt::Engine.generate_salt
			self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
		end
	end
end
