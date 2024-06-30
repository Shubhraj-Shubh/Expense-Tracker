"use client"
import "@/components/page.css"
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip, Rectangle, ResponsiveContainer, CartesianGrid } from "recharts"

export default function Home() {
  const [form, setForm] = useState({ "income": "", "expenses": "", "date": "", "description": "", "recurring": "", "category": "" })
  const [data, setData] = useState([])
  const [formCategory, setFormCategory] = useState(["Food", "Utilities", "Entertainment", "Salary"])
  const [otherCategory, setotherCategory] = useState(false)
  const [filter, setFilter] = useState({ "filterincome1": "", "filterincome2": "", "filterexpenses1": "", "filterexpenses2": "", "filterdate": "", "filterdescription": "", "filterrecurring": "", "filtercategory": "" })
  const [givingnewId, setgivingnewId] = useState(true)

  useEffect(() => {
    const storedData = localStorage.getItem("storage")
    if (storedData) {
      setData(JSON.parse(storedData))
    }
    const storedCategoryData = localStorage.getItem("storageCategory")
    if (storedCategoryData) {
      setFormCategory(JSON.parse(storedCategoryData))
    }
  }, [])



  const handleChange = (e) => {
    if ((e.target.name == "income") || (e.target.name == "expenses")) {
      if (!isNaN(e.target.value)) {
        setForm({ ...form, [e.target.name]: Number(e.target.value) })
      }
      else {
        setForm({ ...form, [e.target.name]: "" })
      }
    }
    else { setForm({ ...form, [e.target.name]: e.target.value }) }
    if (e.target.value == "other") {
      setotherCategory(true)
    }
  }

  const handleChangeFilter = (e) => {
    if ((e.target.name == "filterincome1") || (e.target.name == "filterincome2") || (e.target.name == "filterexpenses1") || (e.target.name == "filterexpenses2")) {
      if (!isNaN(e.target.value)) {
        setFilter({ ...filter, [e.target.name]: Number(e.target.value) })
      }
      else {
        setFilter({ ...filter, [e.target.name]: "" })
      }
    }
    else { setFilter({ ...filter, [e.target.name]: e.target.value }) }
  }

  const handleAdd = () => {
    if (givingnewId == true) {
      setData([...data, { ...form, id: uuidv4() }])
    }
    else {
      setData([...data, form])
      setgivingnewId(true)
    }
    localStorage.setItem("storage", JSON.stringify([...data, { ...form, id: uuidv4() }]))
    setotherCategory(false)
    if (form.category != "" && !formCategory.includes(form.category)) {
      setFormCategory([...formCategory, form.category])
      localStorage.setItem("storageCategory", JSON.stringify([...formCategory, form.category]))
    }
    setForm({ "income": "", "expenses": "", "date": "", "description": "", "recurring": "", "category": "" })

  }

  const handleEdit = (id) => {
    setForm(data.filter(item => (item.id == id))[0])
    setData(data.filter(item => (item.id != id)))
    setgivingnewId(false)
  }

  const handleDelete = (id) => {
    setData(data.filter(item => (item.id != id)))
    localStorage.setItem("storage", JSON.stringify(data.filter(item => (item.id != id))))
  }
  const resetFilter = () => {
    setFilter({ "filterincome1": "", "filterincome2": "", "filterexpenses1": "", "filterexpenses2": "", "filterdate": "", "filterdescription": "", "filterrecurring": "", "filtercategory": "" })
  }

  const totalIncome = data.reduce((initial, item) => initial + item.income, 0);
  const totalExpenses = data.reduce((initial, item) => initial + item.expenses, 0);
  const totalBalance = totalIncome - totalExpenses;

  return (
    <>
      <div className="container">
        <div className="logoContainer">
          <div className="Logo Sign">
            &lt;
            <p className="Track">TRACK</p>
            <p className="OP">OP</p>/&gt;
          </div>
          <div className="Line">
            Your Own Expense Tracker
          </div>
        </div>
        <div className="totalContainer">
          <div className="TotalIncome ">
            <h2>Total Income</h2>
            <p>{totalIncome}</p>
          </div>
          <div className="TotalExpense">
            <h2>Total Expenses</h2>
            <p>{totalExpenses}</p>
          </div>
          <div className="TotalBalance">
            <h2>Remaining Balance</h2>
            <p>{totalBalance}</p>
          </div>
        </div>
        <div className="fullformcontainer">
          <h2>Add New Transactions</h2>
          <div className="formContainer">
            <div className='input'>
              <label htmlFor="income" >INCOME</label>
              <input type="text" id="income" name="income" className="text" value={form.income} onChange={handleChange} placeholder=" Enter Income (integer)" />
            </div>
            <div className='input'>
              <label htmlFor="expenses" >EXPENSES</label>
              <input type="text" id="expenses" name="expenses" className="text" value={form.expenses} onChange={handleChange} placeholder=" Enter Expenses (integer)" />
            </div>
            <div className='input'>
              <label htmlFor="category" >CATEGORY</label>
              {otherCategory == true ? (<input type="text" id="category" name="category" className="text" value={form.category == "other" ? "" : form.category} onChange={handleChange} placeholder=" Enter Category of Transaction" />) :
                (
                  <select name="category" id="category" value={form.category} onChange={handleChange} >
                    <option value="">Please Select Category</option>
                    {formCategory.map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))}
                    <option value="other">Other</option>
                  </select>)}
            </div>
            <div className='input'>
              <label htmlFor="date" >DATE</label>
              <input type="text" id="date" name="date" className="text" value={form.date} onChange={handleChange} placeholder=" Enter Date (DD-MM-YYYY) " />
            </div>
            <div className='input'>
              <label htmlFor="recurring" >RECURRING</label>
              <select name="recurring" id="recurring" value={form.recurring} onChange={handleChange} >
                <option value="">Please Select</option>
                <option value="one-time">One-Time</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className='input'>
              <label htmlFor="description" >DESCRIPTION</label>
              <textarea id="description" name="description" className="text" value={form.description} onChange={handleChange} placeholder=" Enter Description" ></textarea>
            </div>
            <div className="submitButton">
              <button onClick={() => { handleAdd() }}>ADD TRANSACTION</button>
            </div>
          </div>
        </div>
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th><div className="specialFilter"><input type="text" id="filterincome1" name="filterincome1" className="filtertext filter specialfilter" value={filter.filterincome1} onChange={handleChangeFilter} placeholder="From Filter" /><div className="dash"> - </div><input type="text" id="filterincome2" name="filterincome2" className="filtertext filter specialfilter" value={filter.filterincome2} onChange={handleChangeFilter} placeholder="To Filter" /></div></th>
                <th><div className="specialFilter"><input type="text" id="filterexpenses1" name="filterexpenses1" className="filtertext filter specialfilter" value={filter.filterexpenses1} onChange={handleChangeFilter} placeholder="From Filter" /><div className="dash"> - </div><input type="text" id="filterexpenses2" name="filterexpenses2" className="filtertext filter specialfilter" value={filter.filterexpenses2} onChange={handleChangeFilter} placeholder="To Filter" /></div></th>
                <th> <select name="filtercategory" id="filtercategory" className="filter tabselect" value={filter.filtercategory} onChange={handleChangeFilter} >
                  <option value="">Category Filter</option>
                  {formCategory.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select></th>
                <th><input type="text" id="filterdate" name="filterdate" className="filtertext filter tabselect" value={filter.filterdate} onChange={handleChangeFilter} placeholder="Date Filter" /></th>
                <th>   <select name="filterrecurring" id="filterrecurring" className="filter tabselect" value={filter.filterrecurring} onChange={handleChangeFilter} >
                  <option value="">Recurring Filter</option>
                  <option value="one-time">One-Time</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select></th>
                <th><input type="text" id="filterdescription" name="filterdescription" className="filtertext filter tabselect" value={filter.filterdescription} onChange={handleChangeFilter} placeholder="Description Filter" /></th>
                <th className="resetTH" colSpan={2}><div className="resetButton"><button onClick={() => { resetFilter() }}>Filter-Reset</button></div></th>
              </tr>
              <tr>
                <th>Income</th>
                <th>Expenses</th>
                <th>Category</th>
                <th>Date</th>
                <th>Recurring</th>
                <th>Description</th>
                <th className="editTH">EDIT</th>
                <th className="deleteTH" >DELETE</th>
              </tr>
            </thead>
            {data.map(item => {
              if (
                (filter.filterincome1 === "" || item.income > filter.filterincome1) &&
                (filter.filterincome2 === "" || item.income < filter.filterincome2) &&
                (filter.filterexpenses1 === "" || item.expenses > filter.filterexpenses1) &&
                (filter.filterexpenses2 === "" || item.expenses < filter.filterexpenses2) &&
                (filter.filterdate === "" || item.date.startsWith(filter.filterdate)) &&
                (filter.filterdescription === "" || item.description.startsWith(filter.filterdescription)) &&
                (filter.filtercategory === "" || item.category === filter.filtercategory) &&
                (filter.filterrecurring === "" || item.recurring === filter.filterrecurring)
              ) {
                return <tbody key={item.id}>
                  <tr>
                    <td>{item.income}</td>
                    <td>{item.expenses}</td>
                    <td>{item.category}</td>
                    <td>{item.date}</td>
                    <td>{item.recurring}</td>
                    <td>{item.description}</td>
                    <td className="buttonBox"><button onClick={() => { handleEdit(item.id) }}>       <lord-icon
                      src="https://cdn.lordicon.com/gwlusjdu.json"
                      trigger="hover">
                    </lord-icon></button></td>
                    <td className="buttonBox"><button onClick={() => { handleDelete(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover">
                      </lord-icon></button></td>
                  </tr>
                </tbody>
              }
            })}

          </table>
        </div>
        <div className="fullDateBarContainer">
          <h2>Income&Expenses(Sort by Date)</h2>
          <div className="DateBarContainer">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Legend />
                <Tooltip />
                <Bar dataKey="income" fill="#6f6ae3" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="expenses" fill="#318951" activeBar={<Rectangle fill="gold" stroke="purple" />} />
              </BarChart>
            </ResponsiveContainer>
          </div></div>
        <div className="fullCategoryBarContainer">
          <h2>Income&Expenses(Sort by Category)</h2>
          <div className="CategoryBarContainer">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Legend />
                <Tooltip />
                <Bar dataKey="income" fill="#6f6ae3" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="expenses" fill="#318951" activeBar={<Rectangle fill="gold" stroke="purple" />} />
              </BarChart>
            </ResponsiveContainer>
          </div></div>
      </div>

    </>
  );
}
