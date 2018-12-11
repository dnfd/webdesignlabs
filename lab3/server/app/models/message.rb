class Message < ApplicationRecord
  validates :message, presence: true
  validates :theme_id, presence: true
  validates :date, presence: true
  belongs_to :theme
end
