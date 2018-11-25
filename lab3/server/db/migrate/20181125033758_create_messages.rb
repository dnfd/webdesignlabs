class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.bigint "theme_id", null: false

      t.text "message", null: false

      t.timestamps
    end
  end
end
