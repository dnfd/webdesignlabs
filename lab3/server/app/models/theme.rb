class Theme < ApplicationRecord
  validates :theme, presence: true, uniqueness: true

  has_many :messages, dependent: :delete_all
end
